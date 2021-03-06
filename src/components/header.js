import { Link } from "gatsby"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"
import about from "../pages/about"
import project from "../pages/project"


const Content = styled.div`
  max-width: 860px;
  padding: 1rem 1.0875rem;
  font-size: 1.2rem;
  @media only screen and (max-width: 480px) {
   {
    max-width: 350px;
    display:inline-block;
    font-size: 100%;
  }
}
`

const NavLink = styled(Link)`
  color: black;
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  @media only screen and (max-width: 480px) {
   {
    text:20%;
  }
}
`

const GitHubLink = styled.a`
  color: black;
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  @media only screen and (max-width: 480px) {
   {
    text:20%;
  }
}
  
`

const HomeLink = styled(NavLink)`
  margin-right: 500px;
  @media only screen and (max-width: 480px) {
   {
    text:20%;
    margin-left: 0;
  }
}
`


const SiteHeader = styled.header`
  background: transparent;
  display: flex;
  align-content: center;
  justify-content: center;

`



const Header = ({ siteTitle }) => (
  <SiteHeader>
    <Content>
      <p>
        <HomeLink to="/" className="logo">smy</HomeLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/project">Project</NavLink>
        <GitHubLink href="https://github.com/sumi0820?tab=repositories" target="_blank">
          GitHub
        </GitHubLink>
      </p>
    </Content>
  </SiteHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
