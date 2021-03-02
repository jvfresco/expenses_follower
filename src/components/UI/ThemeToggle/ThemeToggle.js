import React from 'react'
import { FormattedMessage } from 'react-intl';

const ThemeToggler = () => {
    const [theme, setTheme] = React.useState('light')
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    React.useEffect(() => {
      document.body.dataset.theme = theme
    }, [theme])

    return (
      <span onClick={() => setTheme(nextTheme)}>
        {nextTheme === 'dark' ?  <FormattedMessage id='theme.dark'/> : <FormattedMessage id='theme.light'/>}
      </span>
    )

}

export default ThemeToggler
