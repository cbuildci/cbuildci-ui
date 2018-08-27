import React from 'react';
import { snapshots } from '../../../../internals/testing/snapshot-util';
import CommitMeta from '../index';

describe('<CommitMeta />', () => {
    it('should render expected JSX', () => {
        snapshots(
            <CommitMeta
                githubHost="foohub.com"
                message="abc123"
                author={{
                    login: 'foobar',
                    name: 'foo',
                    email: 'bar',
                }}
            />,
        );
    });

    it('should render expected JSX if author is missing login', () => {
        snapshots(
            <CommitMeta
                githubHost="foohub.com"
                message="abc123"
                author={{
                    name: 'foo',
                    email: 'bar',
                }}
            />,
        );
    });

    it('should render expected JSX if message is exactly 100 characters', () => {
        snapshots(
            <CommitMeta
                githubHost="foohub.com"
                message={'1234567890'.repeat(10)}
                author={{
                    login: 'foobar',
                    name: 'foo',
                    email: 'bar',
                }}
            />,
        );
    });

    it('should render expected JSX if message is over 100 characters', () => {
        snapshots(
            <CommitMeta
                githubHost="foohub.com"
                message={'1234567890'.repeat(10) + 'A'}
                author={{
                    login: 'foobar',
                    name: 'foo',
                    email: 'bar',
                }}
            />,
        );
    });
});
