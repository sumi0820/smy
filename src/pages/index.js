import React from "react"

import LandingBio from "../components/landing-bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { css } from "@emotion/core"
import styled from "@emotion/styled"


const MarkerHeader = styled.h2`
  display: inline;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    #057989 -50%,
    rgba(255, 250, 150, 0.25)
  );
`


const IndexPage = () => (
  <Layout>
  <MarkerHeader className="marker-header">
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
   </MarkerHeader>
    <LandingBio />
  </Layout>
)

export default IndexPage
