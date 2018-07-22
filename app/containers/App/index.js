/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

const Container = styled.div`
    width: 100%;
    padding-right: calc(15px / 2);
    padding-left: calc(15px / 2);
    margin-right: auto;
    margin-left: auto;
    max-width: 900px;
`;

export default function App() {
    return (
        <Container>
            <Helmet
                titleTemplate="%s - CBuildCI"
                defaultTitle="CBuildCI"
            >
                {false && <meta
                    name="description"
                    content="TODO"
                />}
            </Helmet>
            <Switch>
                <Route path="" component={NotFoundPage} />
            </Switch>
        </Container>
    );
}
