import { Zap, Settings, Mail, Download } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Get your form endpoint in seconds. Copy, paste, and start collecting submissions immediately.",
  },
  {
    icon: Settings,
    title: "Form Control",
    description:
      "Take full control of your forms. Enable or disable submissions instantly from your dashboard.",
  },
  {
    icon: Mail,
    title: "Email Notifications",
    description:
      "Receive real-time email alerts whenever someone submits your form. Never miss a lead.",
  },
  {
    icon: Download,
    title: "Data Export",
    description:
      "Export your submissions to CSV or JSON format for easy analysis and backup.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-emerald-600 tracking-wide uppercase mb-3">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to handle forms
          </h2>
          <p className="text-lg text-gray-600">
            Built for developers who want to focus on building great frontends,
            not managing backends.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 text-gray-900 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-all duration-200 ease-in-out">
                <feature.icon size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
