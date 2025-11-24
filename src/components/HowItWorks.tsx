
import TitleHeader from './TitleHeading';
import { steps } from './dummy';


const HowItWorks = () => {
  

  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <TitleHeader title='How it works'/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How <span className="text-gradient-primary">Decklo</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From startup idea to investor-ready materials in just 4 simple steps. 
            No design experience required.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          {/* <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2"></div> */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="bg-[#FFF6F3] rounded-xl shadow-md p-6 py-8 px-8 flex flex-col items-start min-h-[180px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Icon */}
                  <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-lg bg-[#FDEDE6] group-hover:bg-[#FFD6C2] transition-colors duration-300">
                    <Icon className="h-6 w-6 text-[#FF5A1F]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground text-left">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-left">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;