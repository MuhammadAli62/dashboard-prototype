3
import Award from "../../assets/award1.webp"
import Award1 from "../../assets/award2.webp"
import Award2 from "../../assets/award3.webp"


export default function AwardsSection() {
    return (
      <section className="w-full bg-[#e9e9e9] py-8 md:py-12 border-t-2 border-b-2 border-white">
        <div className="container px-4">
          <div className="flex flex-col w-3/5	m-auto md:flex-row items-center justify-between gap-8">
            <h2 className="text-xl md:text-2xl font-semibold text-indigo-600 text-center md:text-left whitespace-nowrap">
              PROUDLY AWARD-WINNING
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-32 h-16 relative">
                <img
                  src={Award}
                  alt="BBB A+ Rating"
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="w-32 h-16 relative">
                <img
                  src={Award1}
                  alt="Tampa Member"
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="w-32 h-16 relative">
                <img
                  src={Award2}
                  alt="Business Journal"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  