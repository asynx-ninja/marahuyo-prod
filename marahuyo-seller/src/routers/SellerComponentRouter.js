import AnnuallySales from "../components/sales/AnnuallySales";
import DailySales from "../components/sales/DailySales";
import MonthlySales from "../components/sales/MonthlySales";
import SummarySales from "../components/sales/SummarySales";
import Header from "../components/global/Header";
import Sidebar from "../components/global/SmallSidebar";
import SuccessAlert from "../components/global/SuccessAlert";
import InformationAlert from "../components/global/InformationAlert";
import DangerAlert from "../components/global/DangerAlert";

import PrintToPay from "../components/print/PrintTopay"
import PrintToShip from "../components/print/PrintToship"
import PrintToreceive from "../components/print/PrintToreceive";
import PrintCompleted from "../components/print/PrintCompleted";
import PrintCancelled from "../components/print/PrintCancelled";
import PrintReturn from "../components/print/PrintReturn";

import PrintSummary from "../components/printsales/PrintSummary";
import PrintDaily from "../components/printsales/PrintDailysales";
import PrintMonthly from "../components/printsales/PrintMonthlysales";
import PrintAnnually from "../components/printsales/PrintAnnuallysales";

const sales = [
  {
    path: "/annually_sales/:id",
    element: <AnnuallySales />,
  },
  {
    path: "/daily_sales/:id",
    element: <DailySales />,
  },
  {
    path: "/monthly_sales/:id",
    element: <MonthlySales />,
  },
  {
    path: "/summary_sales/:id",
    element: <SummarySales />,
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
  },
  {
    path: "/header",
    element: <Header />,
  },
];

const alerts = [
  {
    path: "/success",
    element: <SuccessAlert />,
  },
  {
    path: "/info",
    element: <InformationAlert />,
  },
  {
    path: "/danger",
    element: <DangerAlert />,
  },
];

const printorders = [
  {
    path: "/print_topay/:id",
    element: <PrintToPay />,
  },
  {
    path: "/print_toship/:id",
    element: <PrintToShip />,
  },
  {
    path: "/print_toreceive/:id",
    element: <PrintToreceive />,
  },
  {
    path: "/print_completed/:id",
    element: <PrintCompleted />,
  },
  {
    path: "/print_cancelled/:id",
    element: <PrintCancelled />,
  },
  {
    path: "/print_return/:id",
    element: <PrintReturn />,
  },
]
const printsales = [
  {
    path: "/print_summary/:id",
    element: <PrintSummary />,
  },
  {
    path: "/print_daily/:id",
    element: <PrintDaily />,
  },
  {
    path: "/print_monthly/:id",
    element: <PrintMonthly />,
  },
  {
    path: "/print_annually/:id",
    element: <PrintAnnually />,
  },
]

const SellerComponentRouter = [...sales, ...alerts, ...printorders, ...printsales];

export default SellerComponentRouter;
