/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';

import { ErrorContextProvider } from 'components/ErrorBoundary';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import TopNav from 'containers/TopNav';

// Pages
import RepoExecutionsPage from 'containers/RepoExecutionsPage/Loadable';
import CommitExecutionsPage from 'containers/CommitExecutionsPage/Loadable';
import ExecutionDetailPage from 'containers/ExecutionDetailPage/Loadable';

import LoginModal from './LoginModal';

const onError = (err, info) => {
    // TODO: How to better handle this?
    // eslint-disable-next-line no-console
    console.log('onError', err, info);
};

export function App() {
    return (
        <ErrorContextProvider value={onError}>
            <div className="container-flex">
                <Helmet
                    titleTemplate="%s - CBuildCI"
                    defaultTitle="CBuildCI"
                />

                <TopNav/>

                <div className="ml-3 mr-3">
                    <Switch>
                        <Route
                            path="/repo/:owner/:repo"
                            exact={true}
                            render={({ location, match }) => {
                                const { owner, repo } = match.params;
                                return (
                                    <RepoExecutionsPage
                                        key={`${owner}/${repo}`}
                                        pathname={location.pathname}
                                        url={match.url}
                                        owner={owner}
                                        repo={repo}
                                    />
                                );
                            }}
                        />

                        <Route
                            path="/repo/:owner/:repo/commit/:commit"
                            exact={true}
                            render={({ location, match }) => {
                                const { owner, repo, commit } = match.params;
                                return (
                                    <CommitExecutionsPage
                                        key={`${owner}/${repo}/${commit}`}
                                        pathname={location.pathname}
                                        url={match.url}
                                        owner={owner}
                                        repo={repo}
                                        commit={commit}
                                    />
                                );
                            }}
                        />

                        <Route
                            path="/repo/:owner/:repo/commit/:commit/exec/:executionNum"
                            render={({ location, match }) => {
                                const { owner, repo, commit, executionNum } = match.params;
                                return (
                                    <ExecutionDetailPage
                                        key={`${owner}/${repo}/${commit}/${executionNum}`}
                                        pathname={location.pathname}
                                        url={match.url}
                                        owner={owner}
                                        repo={repo}
                                        commit={commit}
                                        executionNum={parseInt(executionNum)}
                                    />
                                );
                            }}
                        />

                        {/* <Route
                            path="/repo/:owner/:repo/commit/:commit/exec/:executionNum/build/:buildKey"
                            component={BuildDetailPage}
                            exact={true}
                        /> */}

                        <Route path="" component={NotFoundPage} />
                    </Switch>
                </div>
                <LoginModal/>
            </div>
        </ErrorContextProvider>
    );
}

export default hot(module)(App);
