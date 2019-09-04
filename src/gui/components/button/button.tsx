import './button.scss'
import { h } from 'preact';
import { useMediaQuery, Breakpoint } from '~/kit/use-media-query';
import { useSubscribe } from '~/kit/use-subscribe'
import { useAppContext } from '~/gui/context';
import * as CSS from 'csstype'

// Button describes what configurable keys it wants in a 
// similar way to how we describe what props we want
export enum ButtonConfigurables {
  'DefaultColor' = 'Button.Default.Color',
  'DesktopBackgroundColor' = 'Button.Desktop.BackgroundColor',
  'MobileBackgroundColor' = 'Button.Mobile.BackgroundColor',
}

// Get original prop types for HTMLButton and remove style type
type HTMLButtonProps = Omit<h.JSX.IntrinsicElements['button'], 'style'>

interface ButtonProps extends HTMLButtonProps {
  style?: CSS.Properties
}

export const Button = ({
  style = {},
  className = '',
  ...buttonProps
}: ButtonProps) => {
  const { configurablesService } = useAppContext()
  const configurables = useSubscribe(configurablesService)
  const isMobile = useMediaQuery(Breakpoint.L)

  // Pick out keys we care about, setting defaults as we need
  const color = configurables[ButtonConfigurables.DefaultColor] || 'white'
  
  // Deal with response styles
  const backgroundColor = isMobile
    ? configurables[ButtonConfigurables.MobileBackgroundColor] || 'black'
    : configurables[ButtonConfigurables.DesktopBackgroundColor] || 'black'
  
  // Create a style object
  const buttonStyles = {
    ...style as any,
    backgroundColor,
    color,
  } 

  return <button
    {...buttonProps}
    className={`component-button ${className}`}
    style={buttonStyles}>
  </button>
}