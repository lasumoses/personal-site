import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import VisibilitySensor from "react-visibility-sensor";
import Layout from "../components/layout";
import ReadingProgress from "../components/Articles/ReadingProgress";
import SEO from "../components/seo";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AnchorLink from "react-anchor-link-smooth-scroll";
import StickyLike from "../components/Articles/StickyLike";

const CodeBlock = (props) => (
  <SyntaxHighlighter
    style={atomOneDark}
    wrapLines
    customStyle={{
      padding: 10,
      paddingTop: 15,
      paddingBottom: 0,
      borderRadius: 5,
      margin: 0,
    }}
    showLineNumbers
    lineNumberContainerProps={{
      style: { opacity: 0.5, float: "left", paddingRight: "10px" },
    }}
    {...props}
  />
);

const TableOfContents = ({ tableOfContents, currentHeading, depth = 0 }) => {
  return (
    <ul className="">
      {tableOfContents.items.map((item) => {
        return (
          <li key={item.title}>
            <AnchorLink offset="30" href={item.url}>
              <p
                className={`text-base ml-${depth * 2} ${
                  currentHeading === item.title ? "text-link" : "text-secondary"
                }`}
              >
                {item.title}
              </p>
            </AnchorLink>
            {item.items && (
              <TableOfContents
                tableOfContents={item}
                currentHeading={currentHeading}
                depth={depth + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

TableOfContents.propTypes = {
  tableOfContents: PropTypes.shape({
    items: PropTypes.arrayOf({ title: PropTypes.string }),
  }),
  depth: PropTypes.number,
  currentHeading: PropTypes.string.isRequired,
};

const Article = ({ data }) => {
  const { mdx } = data;
  const target = React.createRef();
  const [currentHeading, setCurrentHeading] = useState("");
  useEffect(() => {
    if (mdx.tableOfContents.items) {
      setCurrentHeading(mdx.tableOfContents.items[0].title);
    }
  }, []);
  function onChange(isVisible, name) {
    if (isVisible) {
      setCurrentHeading(name);
    }
  }
  const Heading = (props) => {
    const CustomTag = `h${props.priority}`;
    return (
      <VisWatcher name={props.children}>
        <CustomTag {...props}>{props.children}</CustomTag>
      </VisWatcher>
    );
  };

  Heading.propTypes = {
    priority: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
  };

  const VisWatcher = ({ children, name }) => {
    return (
      <VisibilitySensor onChange={(e) => onChange(e, name)}>
        {children}
      </VisibilitySensor>
    );
  };

  VisWatcher.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  };

  const components = {
    code: CodeBlock,
    h1: function h1(e) {
      return <Heading {...e} priority={1} />;
    },
    h2: function h2(e) {
      return <Heading {...e} priority={2} />;
    },
    h3: function h3(e) {
      return <Heading {...e} priority={3} />;
    },
    h4: function h4(e) {
      return <Heading {...e} priority={4} />;
    },
    h5: function h5(e) {
      return <Heading {...e} priority={5} />;
    },
    h6: function h6(e) {
      return <Heading {...e} priority={6} />;
    },
  };
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Article"
      />
      <ReadingProgress target={target} />
      <section className="container mx-auto">
        <div className="flex-1 w-full max-w-4xl xl:max-w-full px-4 py-8  mx-auto md:px-8 md:py-16">
          <div className="xl:grid xl:grid-cols-8 xl:gap-12">
            <div className="hidden xl:block col-span-2 mt-12">
              <div className="mr-5 ml-auto my-5 text-4xl w-16 sticky top-0 pt-8">
                <div className="mt-5 p-1 pt-3 bg-secondary rounded text-2xl">
                  <StickyLike />
                </div>
              </div>
            </div>
            <div className="col-span-4 article" ref={target}>
              <h1 className="">{mdx.frontmatter.title}</h1>
              <MDXProvider components={components}>
                <MDXRenderer>{mdx.body}</MDXRenderer>
              </MDXProvider>
            </div>
            <div className="hidden xl:block col-span-2  mt-12">
              <div className="xl:text-left m-4 text-xl sticky top-0 pt-8 w-56">
                <div className="mt-5 -mr-5 p-5 bg-secondary rounded">
                  <h4 className="text-xs mb-3 text-secondary">
                    TABLE OF CONTENTS
                  </h4>
                  <TableOfContents
                    currentHeading={currentHeading}
                    tableOfContents={mdx.tableOfContents}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="xl:hidden flex text-4xl my-10 mt-5 px-1 pt-4  justify-center bg-secondary rounded text-2xl w-64 mx-auto">
            <StickyLike />
          </div>
        </div>
      </section>
    </Layout>
  );
};
Article.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({ title: PropTypes.string.isRequired }),
      tableOfContents: PropTypes.shape({
        items: PropTypes.arrayOf({ title: PropTypes.string }),
      }),
      body: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export const pageQuery = graphql`
  query($slug: String!) {
    sitePage(path: { eq: $slug }) {
      context {
        slug
        articlePage
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      tableOfContents
      frontmatter {
        title
        desc
        date
      }
    }
  }
`;

export default Article;
