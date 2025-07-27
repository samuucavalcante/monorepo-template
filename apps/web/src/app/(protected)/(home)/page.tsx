import { AnalyticsCard } from "@/shared/components/analytics-card";
import { DollarSign, Scissors, TrendingUp, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnalyticsCard
        title="Faturalmento no mês"
        value="$1,250.00"
        icon={<DollarSign className="w-6 h-6 text-primary" />}
        badgeValue="+125%"
        badgeColor="green"
        note="12.5% maior comparado ao mês passado no mesmo período."

        // note="Agendamentos futuros não incluídos"
      />
      <AnalyticsCard
        title="Quantidade de serviços prestados no mês"
        value="1,234"
        icon={<Users className="w-6 h-6 text-primary" />}
        badgeValue="-20%"
        badgeColor="red"
        note="20% menor comparado ao mês passado no mesmo período."
      />
      <AnalyticsCard
        title="Serviço com maior faturamento no mês (corte de cabelo)"
        value="$45,678"
        icon={<Scissors className="w-6 h-6 text-primary" />}
        badgeValue="+12.5%"
        badgeColor="green"
        note="12.5% maior comparado ao mês passado no mesmo período."
      />
      <AnalyticsCard
        title="Estimativa de faturamento até o final do mês"
        value="$1,234"
        icon={<TrendingUp className="w-6 h-6 text-primary" />}
        badgeValue="+4.5%"
        badgeColor="green"
        note="4.5% maior comparado ao mês passado no mesmo período."
      />
    </div>
  );
}
