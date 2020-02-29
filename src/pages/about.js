import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHtml5, faCss3,faJs, faSass, faReact, faNodeJs  } from "@fortawesome/free-brands-svg-icons"


const icons = {
  html : <FontAwesomeIcon icon={faHtml5} size="4x"/>,
  css : <FontAwesomeIcon icon={faCss3} size="4x"/>,
  js : <FontAwesomeIcon icon={faJs} size="4x"/>,
  saas : <FontAwesomeIcon icon={faSass} size="4x"/>,
  react : <FontAwesomeIcon icon={faReact} size="4x"/>,
  nodejs : <FontAwesomeIcon icon={faNodeJs} size="4x"/>
}


const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
`

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

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="About" />
      <Content>
        <div className="about-container">
            <h1>About me</h1>
            <MarkerHeader className="marker-header">Bio </MarkerHeader>

                <li>Name: Sumiya Ushiro</li>
                <li>Nationality: Japan</li><br/>
                <li>After an 1-year work in Japan as <a href="https://drive.google.com/file/d/0B7fGAuDlIdI8NjlWb2duNlNwLVU/view?usp=sharing" target="_blank">an Assistant Production Manager</a> in TV commercial industry, I moved to Singapore and worked as an Operation Program Manager for an outsourcing company. I have developed team and project management skills as well as solution oriented approach through the experience.</li><br/>

                <li>Joining a coding bootcamp at Ironhack Berlin in June 2020. </li><br/>
                
                <MarkerHeader className="marker-header">Skillset </MarkerHeader>
                  <h4 className="h4-header">Language</h4>
                    <div className="language">
                        <li>{icons.html}</li>
                        <li>{icons.css}</li>
                        <li>{icons.saas}</li>
                        <li>{icons.js}</li>
                        <li>{icons.react}</li>
                        <li>{icons.nodejs}</li>
                    </div>

                <h4 className="h4-header">Data Base</h4>
                  <li>MongoDB</li>
                  <li>FireBase</li><br/>

                <h4 className="h4-header">Graphic</h4>
                  <li>Lightroom</li>
                  <li>Photoshop</li>
                  <li>Figma</li> 
                  <li>Final Cut Pro</li> 
                  <li>Adobe Premiere Pro</li> <br/>
                <MarkerHeader className="marker-header">Interests </MarkerHeader>
                  <li><a href="https://www.instagram.com/sumi0820/" target="_blank">Photo</a></li>
                  <li><a href="https://smy-jp.netlify.com/books-i-read-in-2020/" target="_blank">Book</a></li>
                  <li><a href="https://smy-jp.netlify.com/movies-i-watched-in-2020/" target="_blank">Movie</a></li>
                  <li>Work out</li>
                  <li>Cooking</li><br/>
                <MarkerHeader className="marker-header">Read more </MarkerHeader>
              <li><a href="https://github.com/sumi0820?tab=repositories" target="_blank">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/sumiya-ushiro-27ba65133/" target="_blank">LinkedIn</a></li>
              <li>Resume</li>
        </div>
      </Content>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            path
          }
          fields {
            slug
            readingTime {
              text
            }
          }
          excerpt
        }
      }
    }
  }
`
