import React from "react"
import GitMachine from '../components/GitMachine';
import State from '../components/State';

import Layout from "../components/layout"
import SEO from "../components/seo"
import './index.css';

const IndexPage = () => {
  
 return (
  <Layout>
    <SEO title="Home" />
    <p>I built a finite state machine for Git using <a href="https://github.com/davidkpiano/xstate">xstate, a Javascript library for building state machines</a>. Click the different git commands (below, left) to demonstrate the <em>state</em> of a changeset in Git.
      We are assuming some this state machine only represents the state of a <em>single</em> file change. For example, <code>cat "Hello" > file.txt</code> is idempotent and always produces a file called file.txt with the string <code>Hello</code>, as opposed to <code>cat "Hello" >> file.txt</code>, which would result in an additional change set by appending more changes to the existing file.
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
