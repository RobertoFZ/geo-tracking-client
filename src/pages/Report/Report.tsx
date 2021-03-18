import React, { useEffect, useState } from 'react';
import { WithUserProps } from 'hooks/withUser';
import { RouteComponentProps } from 'react-router-dom';
import MainLayout from 'components/layouts/MainLayout';
import { EMenuKeys } from 'shared/constants/menuElements';
import GoogleMaps from 'components/molecules/GoogleMaps/GoogleMaps';
import { Location } from 'api/Location/declarations';
import FloatingContainer from 'components/atoms/FloatingContainer';
import DateRangeSelector, { IDateRangeValues } from 'components/molecules/DateRangeSelector';
import TextAlign from 'components/atoms/TextAlign/TextAlign';
import { LocationZone } from 'api/LocationZone/declarations';
import showMessage, { NoticeType } from 'utils/notifications';
import LocationZoneService from 'api/LocationZone';
import ReportService from 'api/Report';
import { ActivityReportRecord, ActivityReportRequest } from 'api/Report/declarations';
import ReportMap from 'components/molecules/GoogleMaps/ReportMap';
import { getRandomColor } from 'utils/common';
import ReportResultsCollapse from 'components/molecules/ReportResultsCollapse';
import { PaginationData } from 'api/BaseService/declarations';
import moment from 'moment-timezone';
import routes from 'shared/constants/routes';



const ReportPage: React.FC<WithUserProps & RouteComponentProps> = (props) => {
  let usedColors: string[] = [];
  const [request, setRequest] = useState<ActivityReportRequest | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [locationZones, setLocationZones] = useState<LocationZone[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData<ActivityReportRecord>>({
    data: [],
    count: 0,
    limit: 10,
    offset: 0,
    page: 1
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);

  const getLocationZones = async () => {
    try {
      setLoading(true);
      const zones = await LocationZoneService.all();
      setLocationZones(zones);
      setLoading(false);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
      setLoading(false);
    }
  }

  const clearSelectedLocation = () => setSelectedLocation(undefined);

  const onMarkerClick = (record: Location) => {
    if (selectedLocation && selectedLocation.id === record.id) {
      setSelectedLocation(undefined);
    } else {
      setSelectedLocation(record);
    }
  };

  const onSearchReport = async (values: IDateRangeValues) => {
    // https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=•|bdbdbd
    try {

      setLoading(true);
      const request: ActivityReportRequest = {
        from: values.range[0].hour(0).minute(0).second(0).toDate(),
        to: values.range[1].hour(23).minute(59).second(59).toDate(),
        zone_id: values.zone,
      }
      setRequest(request);

      let { results, count } = await ReportService.activity(request, paginationData);

      results = results.map((reportRecord: ActivityReportRecord) => {
        let color = getRandomColor(usedColors);
        reportRecord.color = getRandomColor(usedColors);
        usedColors.push(color);
        return reportRecord;
      });
      paginationData.data = results;
      paginationData.count = count;
      setPaginationData(paginationData);

      setLoading(false);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
      setLoading(false);
    }
  }

  const onPageChange = (page: number) => {
    paginationData.page = page;
    if (request !== undefined) {
      const newRequest: IDateRangeValues = {
        range: [moment(request.from), moment(request.to)],
        zone: request.zone_id
      }
      onSearchReport(newRequest);
    }
  }
  
  const goToPrintPage = () => {
    window.open(`${routes.print}?from=${request?.from.toISOString()}&to=${request?.to.toISOString()}&zone_id=${request?.zone_id}`, '_blank');
  }

  useEffect(() => {
    getLocationZones();
  }, []);

  return (
    <MainLayout {...props} active={EMenuKeys.REPORT}>
      <GoogleMaps>
        {
          !loading &&
          <ReportMap
            reportRecords={paginationData.data}
            onMarkerClick={onMarkerClick}
            selectedLocation={selectedLocation}
            onCloseInfoBox={clearSelectedLocation}
          />
        }
      </GoogleMaps>
      <FloatingContainer
        backgroundColor='transparent'
        bottom='auto'
        top='30px'>
        <TextAlign>
          <DateRangeSelector
            loading={loading}
            onFinish={onSearchReport}
            zones={locationZones} 
            disablePrint={request === undefined}
            onPrint={goToPrintPage}/>
        </TextAlign>
      </FloatingContainer>
      <FloatingContainer>
        <ReportResultsCollapse
          loading={loading}
          paginationData={paginationData}
          onPageChange={onPageChange}
        />
      </FloatingContainer>
    </MainLayout>
  )
};

export default ReportPage;