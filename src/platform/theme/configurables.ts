import * as CSS from 'csstype'

export type ConfigurableValue = string | number | boolean | CSS.Properties
export type Configurables = Record<string, ConfigurableValue>