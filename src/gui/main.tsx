import { h, render } from 'preact'
import { AppContext } from '~/gui/context'
import { ConfigurableStore } from '~/platform/theme'
import { Button } from './components'
import * as fromButton from './components/button/button'

void async function main() {
  // Creating store 
  const configurableStore = new ConfigurableStore()

  // Debugging: logging updates to store in browser 
  // console
  configurableStore.subscribe(console.warn)

  // Debugging: exposing store to window object
  // for direct access from browser console
  ;(window as any).roktTheme = configurableStore

  // Inserting some configurables for demo purposes
  configurableStore.putConfigurables({ 
    [fromButton.ButtonConfigurables.DefaultColor]: '#fff',
    [fromButton.ButtonConfigurables.DesktopBackgroundColor]: '#1976D2',
    [fromButton.ButtonConfigurables.MobileBackgroundColor]: '#212121',
  })

  // Adding/overriding an extra key after some time to demonstrate 
  // reactivity as would be the case in transactions pushing changes 
  // to the widget during the design phase
  setTimeout(() => 
    configurableStore.putConfigurables({ 
      [fromButton.ButtonConfigurables.DefaultColor]: '#BBDEFB' 
    }), 
    5000
  )

  // App has a single button on it, the button has the theme 
  // injected via context
  const App = () => (
    <main>
      <Button>I am a themed button</Button>
    </main>
  )

  // Render context and app, also injecting configurableStore
  // reference into the context
  render(
    <AppContext.Provider value={{
      configurableStore,
    }}>
      <App/>
    </AppContext.Provider>, 
    document.body
  )
}()