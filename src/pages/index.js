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
    <div>
      [no local changes] 
      <br />
      -> [touch file[n].txt] -> [not staged for commit]
      <br />
      -> [git add file[n].txt] -> [changes to commit eg. staged]
      <br />
      -> [git commit file[n].txt] -> [committed]
      <br />

      -> [git reset HEAD~1] -> [reset (softly) to most recent commit eg. not staged ]
      <br />
      -> [git reset --hard HEAD~1] -> [goes all the way back to no local changes]

    </div>
    <GitMachine />
  </Layout>
)

export default IndexPage
