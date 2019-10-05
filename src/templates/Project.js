import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function QandATemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div className="is-grey is-light-grey-bg">
        <div className="row container pad-10-t pad-20-b ">
          <div className="col-xs-12 pad-10-l pad-10-r">
            <Link to="/projects" className="link">
              <h2 className="is-grey margin-0 margin-2-b grow">{`< Projects`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 pad-10-l pad-10-r">
            <h1 className="is-hero-menu is-pink margin-1-t margin-5-b">
              {frontmatter.title}
            </h1>
            {/* <Img fluid={frontmatter.coverimg.childImageSharp.fluid} /> */}
            <h6 className="is-hero-sub-text margin-3-b">{frontmatter.desc}</h6>
            <div className="line margin-5-t margin-5-b" />
            <div
              className={`${html ? "pad-20-b lato article" : ""}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        desc
        coverimg {
          childImageSharp {
            fluid(maxWidth: 1000) {
              # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`