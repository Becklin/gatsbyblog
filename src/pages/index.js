import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components";

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none
`
const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`
const IndexPage = ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>Beck's Thoughts</h1>
      </div>
      TotalCounts: <span>{data.allMarkdownRemark.totalCount}</span>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        console.log('node', node);
        return (
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} = {node.frontmatter.description}
            </BlogTitle>
            <p>{node.excerpt}</p>
          </BlogLink>
        </div>
      )})}
      <Seo title="Home" />
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          html
          id
          excerpt
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`
export default IndexPage
