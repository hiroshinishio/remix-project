import { RemixEngine } from '../../remixEngine'
import { RemixAppManager } from '../../remixAppManager'
import Config from '../../config'
import * as RemixLib from '@remix-project/remix-lib'
import { ThemeService } from './theme'
import { RenderSplashScreen } from './splashscreen/splashscreen'

declare var Registry
const Storage = RemixLib.Storage

class RemixManagerService {
  public appManager: RemixAppManager
  public engine: RemixEngine

  constructor () {
    this.appManager = new RemixAppManager()
    this.engine = new RemixEngine()
    this.engine.register(this.appManager)
    const configStorage = new Storage('config-v0.8:')
    // load app config
    const config = new Config(configStorage)

    Registry.put({ api: config, name: 'config' })
    Registry.put({ api: this.appManager, name: 'appManagerRegistry' })
    Registry.put({ api: this.engine, name: 'engineRegistry' })
  }
}

(async () => {
  new RemixManagerService()
  const themeService = new ThemeService()

  await themeService.activate()
  themeService.themeModule.initTheme(() => RenderSplashScreen())
})()