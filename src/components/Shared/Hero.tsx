import { Button } from "@/components/ui/button"
import ourvideo from "../../../public/hero.mp4"


export default function Hero() {
  return (
    <div className="relative  bg-[#E9E9E9] overflow-hidden p-6">
      {/* Background Video */}
      <div className="absolute inset-0 w-screen  overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute top-1/2 left-1/2 min-w-[100%] min-h-[100%] object-cover -translate-x-1/2 -translate-y-1/2 scale-150"
        >
          <source src={ourvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Diagonal overlay */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(60deg, #E9E9E9 50%, transparent 50.1%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20  container">
        <div className="flex items-center">
          {/* Left Content Section */}
          <div className="w-full lg:w-4/5 px-4 py-12 lg:py-24">
            <div className="space-y-6 max-w-2xl">
              <p className="text-sm md:text-base text-muted-foreground">
                Welcome to FTS
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="text-indigo-600">Empowering Your Business</span>
              </h1>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="text-foreground">
                  with Cutting-Edge IT solutions
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                FedTech Services delivers innovative IT strategies and solutions tailored to your business needs. Discover how we can help you achieve your goals.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  Login
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

