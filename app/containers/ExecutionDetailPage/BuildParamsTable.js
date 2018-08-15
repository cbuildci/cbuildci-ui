/**
 * BuildParamsTable
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

function BuildParamsTable({
    buildParams,
}) {
    return (
        <ParamsTable>
            <tbody>
                <tr>
                    <th>Commit Status</th>
                    <td>{buildParams.commitStatus || ''}</td>
                </tr>
                <tr>
                    <th>CodeBuild Project</th>
                    <td>{buildParams.codeBuildProjectArn}</td>
                </tr>
                <tr>
                    <th>Environment Type</th>
                    <td>{buildParams.environmentType}</td>
                </tr>
                <tr>
                    <th>Compute Type</th>
                    <td>
                        {buildParams.computeType}
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
                        {buildParams.image}
                        {buildParams.image.startsWith('aws/') && (
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
                    <td>{buildParams.buildspec}</td>
                </tr>
                <tr>
                    <th>Privileged Mode</th>
                    <td>{buildParams.privilegedMode ? 'true' : 'false'}</td>
                </tr>
                <tr>
                    <th>Timeout</th>
                    <td>{buildParams.timeoutInMinutes}</td>
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
                        {buildParams.dependsOn.length === 0 && (
                            <em className="text-muted">None</em>
                        )}
                        {buildParams.dependsOn.length > 0 && (
                            <ul className="mb-0 pl-4">
                                {buildParams.dependsOn.map((v, i) => (
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
                    <td>{buildParams.sourceS3Bucket}</td>
                </tr>
                <tr>
                    <th>Source S3 Key Prefix</th>
                    <td>{buildParams.sourceS3KeyPrefix}</td>
                </tr>
                <tr>
                    <th>Artifact S3 Bucket</th>
                    <td>{buildParams.artifactS3Bucket}</td>
                </tr>
                <tr>
                    <th>Artifact S3 Key Prefix</th>
                    <td>{buildParams.artifactS3KeyPrefix}</td>
                </tr>
                <tr>
                    <th>Environment variables</th>
                    <td>
                        <EnvVars>
                            {buildParams.environmentVariables.map(({ name, value }, i) => {
                                return (
                                    <div key={i}><code style={{ wordBreak: 'break-all' }}>{name}={value}</code></div>
                                );
                            })}
                        </EnvVars>
                    </td>
                </tr>
            </tbody>
        </ParamsTable>
    );
}

BuildParamsTable.propTypes = {
    buildParams: PropTypes.object.isRequired,
};

export default BuildParamsTable;
