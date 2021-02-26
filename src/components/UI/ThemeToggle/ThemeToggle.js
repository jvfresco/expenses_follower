import React from 'react'


const ThemeToggler = () => {
    const [theme, setTheme] = React.useState('light')
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    React.useEffect(() => {
      document.body.dataset.theme = theme
    }, [theme])

    return (
      <span onClick={() => setTheme(nextTheme)}>
        {nextTheme} theme
      </span>
    )

}

export default ThemeToggler
