import { h, render } from 'preact'
import { map } from 'rxjs/operators'
import { AppContext } from '~/gui/context'
import { State } from '~/kit/memory-store'
import { ConfigurablesService } from '~/platform/theme'
import { Button, ButtonConfigurables } from './components'

void async function main() {
  // Creating store 
  const store = State.Create({ useReduxTools: true })
  const configurablesService = new ConfigurablesService(store)

  // Debugging: logging updates to store in browser 
  // console
  configurablesService
    .pipe(map(state => JSON.stringify(state, null, 4)))
    .subscribe(console.log)

  // Debugging: exposing store to window object
  // for direct access from browser console
  ;(window as any).configurablesService = configurablesService

  // Inserting some configurables for demo purposes
  configurablesService.putConfigurables({ 
    [ButtonConfigurables.DefaultColor]: '#fff',
    [ButtonConfigurables.DesktopBackgroundColor]: '#1976D2',
    [ButtonConfigurables.MobileBackgroundColor]: '#212121',
  })

  // Adding/overriding an extra key after some time to demonstrate 
  // reactivity as would be the case in transactions pushing changes 
  // to the widget during the design phase
  setTimeout(() => 
    configurablesService.putConfigurables({ 
      [ButtonConfigurables.DefaultColor]: '#BBDEFB' 
    }), 
    2000
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
      configurablesService,
    }}>
      <App/>
    </AppContext.Provider>, 
    document.body
  )
}()