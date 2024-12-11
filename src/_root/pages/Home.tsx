import Hero from "@/components/Shared/Hero"
import AwardsSection from "@/components/Shared/Award"
import FeaturesSection from "@/components/Shared/features-section"
import TeamSection from "@/components/Shared/team-section"
import AboutSection from "@/components/Shared/about-section"
import CTASection from "@/components/Shared/CTASection"
import Footer from "@/components/Shared/Footer"
import Header from "@/components/Shared/Header"
const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <AwardsSection />
            <FeaturesSection />
            <TeamSection />
            <AboutSection />
            <CTASection />
            <Footer />
        </>
    )
}

export default Home