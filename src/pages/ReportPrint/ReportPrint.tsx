import React, { useEffect, useState } from 'react';
import { WithUserProps } from 'hooks/withUser';
import { RouteComponentProps } from 'react-router-dom';
import GoogleMaps from 'components/molecules/GoogleMaps/GoogleMaps';
import { Location } from 'api/Location/declarations';
import { IDateRangeValues } from 'components/molecules/DateRangeSelector';
import showMessage, { NoticeType } from 'utils/notifications';
import ReportService from 'api/Report';
import { ActivityReportRecord, ActivityReportRequest } from 'api/Report/declarations';
import ReportMap from 'components/molecules/GoogleMaps/ReportMap';
import { getRandomColor } from 'utils/common';
import moment from 'moment-timezone';
import qs from 'qs';
import ReportList from 'components/molecules/ReportList';

const ReportPrintPage: React.FC<WithUserProps & RouteComponentProps> = (props) => {
  let usedColors: string[] = [];
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<ActivityReportRecord[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);

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

      let results = await ReportService.allActivity(request)

      results = results.map((reportRecord: ActivityReportRecord) => {
        let color = getRandomColor(usedColors);
        reportRecord.color = getRandomColor(usedColors);
        usedColors.push(color);
        return reportRecord;
      });
      setResults(results);
      setLoading(false);
      
      setTimeout(() => {
        window.print();
      }, 3000);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
      setLoading(false);
    }
  }

  useEffect(() => {
    const data: any = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    const newRequest: IDateRangeValues = {
      range: [moment(data.from), moment(data.to)],
      zone: Number(data.zone_id)
    }
    onSearchReport(newRequest);
  }, []);

  return (
    <>
      <GoogleMaps>
        {
          !loading &&
          <ReportMap
            reportRecords={results}
            onMarkerClick={onMarkerClick}
            selectedLocation={selectedLocation}
            onCloseInfoBox={clearSelectedLocation}
          />
        }
      </GoogleMaps>
      <ReportList data={results} loading={loading} padding='0 50px' />
    </>
  )
};

export default ReportPrintPage;