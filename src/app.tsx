import React, { useState, useEffect } from "react";

// @ts-ignore
const Header = React.lazy(() => import('header'))

const App = () => {
  const [text, setText] = useState<string>('Israel')

  return (
    <>
      <React.Suspense fallback={() => <div />}>
        <Header title={text} />
      </React.Suspense>
      <h1>{text}</h1>
      <input type="text" onChange={(evt) => setText(evt.target.value)} />
    </>
  )
}

export default App