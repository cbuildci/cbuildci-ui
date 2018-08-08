import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import PhasesTable from '../index';

describe('<PhasesTable />', () => {
    it('should render expected JSX', () => {
        snapshots(
            <PhasesTable
                phases={[
                    {
                        startTime: '2018-07-27T16:52:18.099Z',
                        endTime: '2018-07-27T16:52:18.496Z',
                        phaseStatus: 'SUCCEEDED',
                        durationInSeconds: 0,
                        phaseType: 'SUBMITTED',
                    },
                    {
                        startTime: '2018-07-27T16:52:18.496Z',
                        endTime: '2018-07-27T16:52:27.228Z',
                        contexts: [],
                        phaseStatus: 'SUCCEEDED',
                        durationInSeconds: 8,
                        phaseType: 'PROVISIONING',
                    },
                    {
                        startTime: '2018-07-27T16:52:27.228Z',
                        endTime: '2018-07-27T16:52:27.481Z',
                        contexts: [],
                        phaseStatus: 'SUCCEEDED',
                        durationInSeconds: 0,
                        phaseType: 'DOWNLOAD_SOURCE',
                    },
                    {
                        startTime: '2018-07-27T16:52:27.481Z',
                        endTime: '2018-07-27T16:52:32.601Z',
                        contexts: [],
                        phaseStatus: 'SUCCEEDED',
                        durationInSeconds: 5,
                        phaseType: 'INSTALL',
                    },
                    {
                        startTime: '2018-07-27T16:52:32.601Z',
                        endTime: '2018-07-27T16:52:32.677Z',
                        contexts: [],
                        phaseStatus: 'SUCCEEDED',
                        durationInSeconds: 0,
                        phaseType: 'PRE_BUILD',
                    },
                    {
                        startTime: '2018-07-27T16:52:32.677Z',
                        endTime: '2018-07-27T16:52:32.802Z',
                        contexts: [],
                        phaseStatus: 'SUCCEEDED',
                        durationInSeconds: 0,
                        phaseType: 'BUILD',
                    },
                    {
                        startTime: '2018-07-27T16:52:32.802Z',
                        endTime: '2018-07-27T16:52:32.904Z',
                        contexts: [],
                        phaseStatus: 'SUCCEEDED',
                        durationInSeconds: 0,
                        phaseType: 'POST_BUILD',
                    },
                    {
                        startTime: '2018-07-27T16:52:32.904Z',
                        endTime: '2018-07-27T16:52:32.983Z',
                        contexts: [],
                        phaseStatus: 'SUCCEEDED',
                        durationInSeconds: 0,
                        phaseType: 'UPLOAD_ARTIFACTS',
                    },
                    {
                        startTime: '2018-07-27T16:52:32.983Z',
                        endTime: '2018-07-27T16:52:35.099Z',
                        contexts: [],
                        phaseStatus: 'SUCCEEDED',
                        durationInSeconds: 2,
                        phaseType: 'FINALIZING',
                    },
                    {
                        phaseType: 'COMPLETED',
                        startTime: '2018-07-27T16:52:35.099Z',
                        endTime: null,
                    },
                ]}/>,
        );
    });
});
