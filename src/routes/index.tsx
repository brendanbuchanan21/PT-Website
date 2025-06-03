import { createFileRoute } from '@tanstack/react-router'
import '../styles.css'
import HeroSection from '@/components/Hero-Section'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <header>
       <HeroSection />
      </header>
    </div>
  )
}

{/* Status colors: 
Style Name
Hex Code
Usage
Status / Success
#388E3C
Form success messages
Status / Error
#C62828
Form error states
Status / Warning
#FBC02D
Alerts, form cautions

Background colors: Style Name
Hex Code
Usage
Background / Default
#FFF8F1
Page backgrounds
Background / Alt
#F5F5F5
Section blocks, testimonials
Background / Dark
#581845
Footer, headers (dark mode)
Text colors: Style Name
Hex Code
Usage
Text / Primary
#424242
Main body text, navigation
Text / Inverse
#FFFFFF
Text on dark backgrounds
Text / Muted
#757575
Secondary text, labels */}