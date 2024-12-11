import About from "../../assets/about.webp"



const AboutSection: React.FC = () => {
  return (
    <div className="relative min-h-screen  overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:  `url('../../assets/bg-about.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />

      <div className="container  w-4/5 mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-800 mb-8">About Us</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod 
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam 
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod 
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam
            </p>
          </div>

          <div className="relative">
            <div className="relative w-full  mx-auto">
              <div className="w-full h-auto rounded-lg overflow-hidden">
                <img 
                  src={About}
                  alt="Website screenshot 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

