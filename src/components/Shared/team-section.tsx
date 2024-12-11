import { LinkedinIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Person1 from "../../assets/Allen_Noble.jpg"
import Person2 from "../../assets/s-dabhade.jpg"
import Person3 from "../../assets/Brian Curcio.jpg"
import Person4 from "../../assets/Mike Friedel.jpg"

interface TeamMember {
    name: string
    role: string
    image: string
    linkedin: string
}

const team: TeamMember[] = [
    {
        name: "Allen Noble",
        role: "Founder",
        image: Person1,
        linkedin: "https://www.linkedin.com/in/allen-noble",
    },
    {
        name: "S. Dabhade",
        role: "Chief Operations Officer",
        image: Person2,
        linkedin: "https://www.linkedin.com/in/s-dabhade",
    },
    {
        name: "Brian Curcio",
        role: "Chief Technology Officer",
        image: Person3,
        linkedin: "https://www.linkedin.com/in/brian-curcio",
    },
    {
        name: "Mike Friedel",
        role: "Chief Growth Officer",
        image: Person4,
        linkedin: "https://www.linkedin.com/in/mike-friedel",
    },
]

export default function TeamSection() {
    return (
        <section className="py-12 px-4 md:py-24">
            <div className="container mx-auto">
                <h2 className="text-center text-2xl font-semibold text-purple-700 mb-12">Meet The Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                    {team.map((member) => (
                        <div key={member.name} className="flex flex-col items-center ">
                            <div className="relative mb-4  items-center flex flex-col">
                                <div className="w-48 h-48  rounded-full overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        width={192}
                                        height="100%"
                                        className="object-cover"
                                    />
                                </div>
                                <a
                                    href={member.linkedin}
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                                />
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="rounded-full bg-white shadow-lg hover:bg-gray-100"
                                >
                                    <LinkedinIcon className="w-4 h-4 text-blue-600 m-auto" />
                                    <span className="sr-only">LinkedIn profile</span>
                                </Button>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

