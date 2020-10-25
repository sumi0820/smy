import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import icon from "../images/favicon.png"

import { TweenMax, Power3 } from "gsap"

const Container = styled.div`
  text-align: center;
`

const Img = styled.img`
  margin-bottom: 0;
`

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 78vh;
`

const Description = styled.p`
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`

const NameHeader = styled.h1`
  font-size: 3.5rem;
  color: #fff;
  text-stroke: 1px hsla(0, 0%, 0%, 0.8);
  -webkit-text-stroke: 0.5px hsla(0, 0%, 0%, 0.8);
  margin-bottom: 0;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    #0278ae -50%,
    rgba(255, 250, 150, 0.25)
  );
`

const LandingBio = () => {
  let logoItem = useRef(null)
  console.log("This is",logoItem)

  useEffect(() => {
    console.log(logoItem);
    TweenMax.to(
      logoItem,
      3,{
        opacity:1,
        y:-20,
        ease: Power3.easeOut,
        delay:0.2
      }
    )
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query LandingSiteTitleQuery {
          site {
            siteMetadata {
              title
              subtitle
            }
          }
        }
      `}
      render={data => (
        <OuterContainer>
          <Container>
            <img
              src={icon}
              className="landing__img"
              ref={el => {
                logoItem = el
              }}
              alt="logo"
            />
            <Description>{data.site.siteMetadata.subtitle}</Description>
          </Container>
        </OuterContainer>
      )}
    />
  )
}

NameHeader.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string,
}

NameHeader.defaultProps = {
  siteTitle: ``,
  subtitle: ``,
}

export default LandingBio
