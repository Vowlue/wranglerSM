import { Router } from "@reach/router";

import Posts from './components/posts'

var cardStyle = {
  display: 'flex',
  width: '100%',
  height: '100%'
}

function App() {
  return (
    <Router style={cardStyle}>
      <Posts path="/" />
    </Router>
  );
}

export default App;