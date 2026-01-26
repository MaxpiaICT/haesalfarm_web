import HeroSection from './HeroSection'
import VideoSection from './VideoSection'   // ✅ 추가
import StructureSection from './StructureSection'
import ProcessSection from './ProcessSection'
import ContactSection from './ContactSection'

export default function Construction() {
  return (
    <>
      <HeroSection />
      <VideoSection />   {/* ✅ Hero 바로 아래 */}
      <StructureSection />
      <ProcessSection />
      <ContactSection />
    </>
  )
}
