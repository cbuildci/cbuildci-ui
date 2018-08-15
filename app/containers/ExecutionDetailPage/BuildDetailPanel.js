/**
 * ExecutionDetailPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Panel, PanelTabs, Tab } from 'components/Panel';

const logs = [
    { text: '[Container] 2018/07/08 19:13:46 Waiting for agent ping' },
    { text: '[Container] 2018/07/08 19:13:50 Waiting for DOWNLOAD_SOURCE' },
    { text: '[Container] 2018/07/08 19:13:50 Phase is DOWNLOAD_SOURCE' },
    { text: '[Container] 2018/07/08 19:13:50 CODEBUILD_SRC_DIR=/codebuild/output/src090371394/src' },
    { text: '[Container] 2018/07/08 19:13:50 YAML location is /codebuild/output/src090371394/src/buildspec.yml' },
    { text: '[Container] 2018/07/08 19:13:50 Processing environment variables' },
    { text: '[Container] 2018/07/08 19:13:50 Moving to directory /codebuild/output/src090371394/src' },
    { text: '[Container] 2018/07/08 19:13:50 Registering with agent' },
    { text: '[Container] 2018/07/08 19:13:50 Phases found in YAML: 4' },
    { text: '[Container] 2018/07/08 19:13:50 INSTALL: 2 commands' },
    { text: '[Container] 2018/07/08 19:13:50 PRE_BUILD: 1 commands' },
    { text: '[Container] 2018/07/08 19:13:50 BUILD: 2 commands' },
    { text: '[Container] 2018/07/08 19:13:50 POST_BUILD: 1 commands' },
    { text: '[Container] 2018/07/08 19:13:50 Phase complete: DOWNLOAD_SOURCE Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:50 Phase context status code: Message:' },
    { text: '[Container] 2018/07/08 19:13:50 Entering phase INSTALL', color: '#268bd2' },
    { text: '[Container] 2018/07/08 19:13:50 Running command echo install', color: '#6c71c4' },
    { text: 'install' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:50 Running command sleep $SLEEP_TIME', color: '#6c71c4' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Phase complete: INSTALL Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:55 Phase context status code: Message:' },
    { text: '[Container] 2018/07/08 19:13:55 Entering phase PRE_BUILD', color: '#268bd2' },
    { text: '[Container] 2018/07/08 19:13:55 Running command echo pre_build', color: '#6c71c4' },
    { text: 'pre_build' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Phase complete: PRE_BUILD Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:55 Phase context status code: Message:' },
    { text: '[Container] 2018/07/08 19:13:55 Entering phase BUILD', color: '#268bd2' },
    { text: '[Container] 2018/07/08 19:13:55 Running command echo build', color: '#6c71c4' },
    { text: 'build' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Running command bash -c \'[ "$FAIL" == "" ]\'', color: '#6c71c4' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Phase complete: BUILD Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:55 Phase context status code: Message:' },
    { text: '[Container] 2018/07/08 19:13:55 Entering phase POST_BUILD', color: '#268bd2' },
    { text: '[Container] 2018/07/08 19:13:55 Running command echo post_build', color: '#6c71c4' },
    { text: 'post_build' },
    { text: '' },
    { text: '[Container] 2018/07/08 19:13:55 Phase complete: POST_BUILD Success: true', color: '#859900' },
    { text: '[Container] 2018/07/08 19:13:55 Phase context status code: Message:' },
];

const Logs = styled.pre`
    font-size: 0.85rem;
    background-color: #002B36;
    color: #93A1A1;
    padding: 8px;
    margin: 0;
`;

const ParamsTable = styled.table`
    max-width: 100%;
    background-color: transparent;
    border-collapse: collapse;
    
    td, th {
        padding: 0.3rem;
        vertical-align: top;
    }
    
    th {
        text-align: right;
        white-space: nowrap;
    }
`;

const EnvVars = styled.div`
    & > div {
        border-top: 1px solid #CCC;
        padding-top: 6px;
        margin-top: 6px;
    }

    & > div:first-child {
        border-top-width: 0;
        padding-top: 0;
        margin-top: 0;
    }
`;

const TAB_LOGS = 'LOGS';
const TAB_PHASES = 'PHASES';
const TAB_ARTIFACTS = 'ARTIFACTS';
const TAB_PARAMETERS = 'PARAMETERS';

class BuildDetailPanel extends React.Component {

    constructor(props) {
        super(props);

        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    state = {
        tab: TAB_LOGS,
    };

    handleChangeTab(evt) {
        this.setState({
            tab: evt.target.getAttribute('data-tab'),
        });
    }

    render() {
        const { execution, buildKey } = this.props;
        const { tab } = this.state;

        const buildState = execution.state.builds[buildKey];

        return (
            <Panel>
                <PanelTabs>
                    <Tab active={tab === TAB_LOGS} data-tab={TAB_LOGS} onClick={this.handleChangeTab}>
                        <i className="fas fa-desktop mr-2 text-muted"/>
                        Console
                    </Tab>
                    <Tab active={tab === TAB_PHASES} data-tab={TAB_PHASES} onClick={this.handleChangeTab}>
                        <i className="fas fa-tasks mr-2 text-muted"/>
                        Phases
                    </Tab>
                    <Tab active={tab === TAB_ARTIFACTS} data-tab={TAB_ARTIFACTS} onClick={this.handleChangeTab}>
                        <i className="fas fa-archive mr-2 text-muted"/>
                        Artifacts
                    </Tab>
                    <Tab active={tab === TAB_PARAMETERS} data-tab={TAB_PARAMETERS} onClick={this.handleChangeTab}>
                        <i className="fas fa-wrench mr-2 text-muted"/>
                        Parameters
                    </Tab>
                </PanelTabs>

                {tab === TAB_LOGS && (
                    <React.Fragment>
                        <div className="mb-2">
                            Showing last 20 lines - <a href="#">View All</a>
                        </div>
                        <Logs>
                            {logs.slice(-20).map((v, i) => {
                                return (
                                    <span key={i} style={{ color: v.color }}>{`${v.text}\n`}</span>
                                );
                            })}
                        </Logs>
                    </React.Fragment>
                )}

                {tab === TAB_PARAMETERS && (
                    <React.Fragment>
                        <ParamsTable>
                            <tbody>
                                <tr>
                                    <th>Commit Status</th>
                                    <td>{buildState.buildParams.commitStatus || ''}</td>
                                </tr>
                                <tr>
                                    <th>CodeBuild Project</th>
                                    <td>{buildState.buildParams.codeBuildProjectArn}</td>
                                </tr>
                                <tr>
                                    <th>Environment Type</th>
                                    <td>{buildState.buildParams.environmentType}</td>
                                </tr>
                                <tr>
                                    <th>Compute Type</th>
                                    <td>
                                        {buildState.buildParams.computeType}
                                        <a
                                            className="ml-2"
                                            href="https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-compute-types.html"
                                            target="_blank"
                                        >
                                            <i className="fas fa-external-link-alt"/>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Docker Image</th>
                                    <td>
                                        {buildState.buildParams.image}
                                        {buildState.buildParams.image.startsWith('aws/') && (
                                            <a
                                                className="ml-2"
                                                href="https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html"
                                                target="_blank"
                                            >
                                                <i className="fas fa-external-link-alt"/>
                                            </a>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Buildspec</th>
                                    <td>{buildState.buildParams.buildspec}</td>
                                </tr>
                                <tr>
                                    <th>Privileged Mode</th>
                                    <td>{buildState.buildParams.privilegedMode ? 'true' : 'false'}</td>
                                </tr>
                                <tr>
                                    <th>Timeout</th>
                                    <td>{buildState.buildParams.timeoutInMinutes}</td>
                                </tr>
                                {/* <tr>
                                    <th>Stop If</th>
                                    <td>
                                        <ul className="mb-0 pl-4">
                                            <li>Not Branch Head</li>
                                        </ul>
                                    </td>
                                </tr> */}
                                <tr>
                                    <th>Depends On</th>
                                    <td>
                                        {buildState.buildParams.dependsOn.length === 0 && (
                                            <em className="text-muted">None</em>
                                        )}
                                        {buildState.buildParams.dependsOn.length > 0 && (
                                            <ul className="mb-0 pl-4">
                                                {buildState.buildParams.dependsOn.map((v, i) => (
                                                    <li key={i}>{v}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                                {/* <tr>
                                    <th>Branches</th>
                                    <td><em className="text-muted">N/A</em></td>
                                </tr> */}
                                <tr>
                                    <th>Source S3 Bucket</th>
                                    <td>{buildState.buildParams.sourceS3Bucket}</td>
                                </tr>
                                <tr>
                                    <th>Source S3 Key Prefix</th>
                                    <td>{buildState.buildParams.sourceS3KeyPrefix}</td>
                                </tr>
                                <tr>
                                    <th>Artifact S3 Bucket</th>
                                    <td>{buildState.buildParams.artifactS3Bucket}</td>
                                </tr>
                                <tr>
                                    <th>Artifact S3 Key Prefix</th>
                                    <td>{buildState.buildParams.artifactS3KeyPrefix}</td>
                                </tr>
                                <tr>
                                    <th>Environment variables</th>
                                    <td>
                                        <EnvVars>
                                            {buildState.buildParams.environmentVariables.map(({ name, value }, i) => {
                                                return (
                                                    <div key={i}><code style={{ wordBreak: 'break-all' }}>{name}={value}</code></div>
                                                );
                                            })}
                                        </EnvVars>
                                    </td>
                                </tr>
                            </tbody>
                        </ParamsTable>
                    </React.Fragment>
                )}
            </Panel>
        );
    }
}

BuildDetailPanel.propTypes = {
    execution: PropTypes.object.isRequired,
    buildKey: PropTypes.string.isRequired,
};

export default BuildDetailPanel;
