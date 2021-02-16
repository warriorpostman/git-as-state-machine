import React from "react"
// import { Link } from "gatsby"
import GitMachine from '../components/GitMachine';
import State from '../components/State';

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  
 return (
  <Layout>
    <SEO title="Home" />
    <p>Welcome to the git commit state machine. Click the different git commands to demonstrate the <em>state</em> of a changeset in Git.
      <code>
        ./README.md
      </code>
      This state machine is predicated on the assumption that we are only represnting the state of a <em>single</em> file change. For example, <code>cat "Hello" > file.txt</code> is idempotent, as opposed to <code>cat "Hello" >> file.txt</code>, which would result in an additional change set.
    </p>

    { false && <>
        <div>Indicates a possible state in the machine</div>
        <State>
          Lights On
        </State>
      </>
    }
    <GitMachine />

    <div style={{ display: 'flex' }}>
      <em>NOTE:</em>
      <State current={true}>
        Positively Derped...
      </State> Indicates a the current state of the machine.
    </div>
  </Layout>
);
}

export default IndexPage
