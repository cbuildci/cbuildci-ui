import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import BuildCard from '../index';

describe('<BuildCard />', () => {
    const snapshotOpts = { memoryRouter: true };

    it('should render expected JSX with minimal props', () => {
        snapshots(
            <BuildCard
                owner="foo"
                repo="bar"
                commit="33bf84a4563dcd16e027c0c6cf2a08984740d3f5"
                executionNum={2}
                executionCreateTime={1500000000000}
                executionUpdateTime={1500000000000 + 1800000}
                buildKey="mybuild"
                status="STARTING"
            />,
            snapshotOpts,
        );
    });

    it('should render expected JSX when waiting on 1 dependency', () => {
        snapshots(
            <BuildCard
                owner="foo"
                repo="bar"
                commit="33bf84a4563dcd16e027c0c6cf2a08984740d3f5"
                executionNum={2}
                executionCreateTime={1500000000000}
                executionUpdateTime={1500000000000 + 1800000}
                buildKey="mybuild"
                status="WAITING_FOR_DEPENDENCY"
                waitingForDeps={[
                    'first',
                ]}
            />,
            snapshotOpts,
        );
    });

    it('should render expected JSX when waiting on 2 dependencies', () => {
        snapshots(
            <BuildCard
                owner="foo"
                repo="bar"
                commit="33bf84a4563dcd16e027c0c6cf2a08984740d3f5"
                executionNum={2}
                executionCreateTime={1500000000000}
                executionUpdateTime={1500000000000 + 1800000}
                buildKey="mybuild"
                status="WAITING_FOR_DEPENDENCY"
                waitingForDeps={[
                    'first',
                    'second',
                ]}
            />,
            snapshotOpts,
        );
    });

    it('should render expected JSX when waiting on 3 dependencies', () => {
        snapshots(
            <BuildCard
                owner="foo"
                repo="bar"
                commit="33bf84a4563dcd16e027c0c6cf2a08984740d3f5"
                executionNum={2}
                executionCreateTime={1500000000000}
                executionUpdateTime={1500000000000 + 1800000}
                buildKey="mybuild"
                status="WAITING_FOR_DEPENDENCY"
                waitingForDeps={[
                    'first',
                    'second',
                    'third',
                ]}
            />,
            snapshotOpts,
        );
    });

    it('should render expected JSX when running', () => {
        snapshots(
            <BuildCard
                owner="foo"
                repo="bar"
                commit="33bf84a4563dcd16e027c0c6cf2a08984740d3f5"
                executionNum={2}
                executionCreateTime={1500000000000}
                executionUpdateTime={1500000000000 + 15 * 60000}
                buildKey="mybuild"
                status="IN_PROGRESS"
                startTime={1500000000000 + 5 * 60000}
            />,
            snapshotOpts,
        );
    });

    it('should render expected JSX when completed', () => {
        snapshots(
            <BuildCard
                owner="foo"
                repo="bar"
                commit="33bf84a4563dcd16e027c0c6cf2a08984740d3f5"
                executionNum={2}
                executionCreateTime={1500000000000}
                executionUpdateTime={1500000000000 + 30 * 60000}
                buildKey="mybuild"
                status="SUCCEEDED"
                startTime={1500000000000 + 5 * 60000}
                endTime={1500000000000 + 15 * 60000}
            />,
            snapshotOpts,
        );
    });

    it.skip('should render expected JSX for phases', () => {
        // TODO
    });
});
