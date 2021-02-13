import React from "react"
// import { Link } from "gatsby"
import GitMachine from '../components/GitMachine';

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p>Welcome to the git commit state machine. Click the different git commands to demonstrate the <code>state</code> of files.
      <code>
        ./README.md
      </code>
    </p>
    <GitMachine />
  </Layout>
)

export default IndexPage
