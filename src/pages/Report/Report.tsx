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



const ReportPage: React.FC<WithUserProps & RouteComponentProps> = (props) => {
  let usedColors: string[] = [];
  const [loading, setLoading] = useState(false);
  const [locationZones, setLocationZones] = useState<LocationZone[]>([]);
  const [reportData, setReportData] = useState<ActivityReportRecord[]>([]);
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
      setReportData([]);
      setLoading(true);
      const request: ActivityReportRequest = {
        from: values.range[0].hour(0).minute(0).second(0).toDate(),
        to: values.range[1].hour(23).minute(59).second(59).toDate(),
        zone_id: values.zone,
      }
      let response = await ReportService.activity(request);

      response = response.map((reportRecord: ActivityReportRecord) => {
        let color = getRandomColor(usedColors);
        reportRecord.color = getRandomColor(usedColors);
        usedColors.push(color);
        return reportRecord;
      });

      setReportData(response);
      setLoading(false);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
      setLoading(false);
    }
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
            reportRecords={reportData}
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
            zones={locationZones} />
        </TextAlign>
      </FloatingContainer>
      <FloatingContainer>
        <ReportResultsCollapse
          loading={loading}
          data={reportData}
        />
      </FloatingContainer>
    </MainLayout>
  )
};

export default ReportPage;