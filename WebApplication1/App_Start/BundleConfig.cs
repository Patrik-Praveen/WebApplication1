using System.Web;
using System.Web.Optimization;

namespace WebApplication1
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //BundleTable.EnableOptimizations = false;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryblockUI").Include(
                        "~/Scripts/jquery.blockui.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                         "~/Scripts/jquery.validate.js",
                         "~/Scripts/jquery.validate.unobtrusive.js",
                          "~/Scripts/jquery.unobtrusive*"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryajax").Include(
                        "~/Scripts/jquery.unobtrusive-ajax*"
                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/amCharts").Include(
                        "~/Scripts/amchart/amcharts.js",
                        "~/Scripts/amchart/serial.js",
                        "~/Scripts/amchart/xy.js", "~/Scripts/amchart/pie.js",
                        "~/Scripts/amchart/plugins/export/export.js",
                        "~/Scripts/amchart/plugins/responsive/responsive.js",
                        "~/Scripts/amchart/usa2Low.js",
                          "~/Scripts/amchart/ammap.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/Common").Include(
                      "~/Content/vendor/plugins/form/bootstrap-select/bootstrap-select.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/printCharts").Include(
                     "~/Scripts/charts/PrintChart.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/bootstrap.min.css",
                     "~/Content/assets/css/style.css",
                     "~/Content/assets/css/ui.css",
                     "~/Content/assets/css/themes/theme-default.css",
                      "~/Content/Site.css"));

            bundles.Add(new StyleBundle("~/Content/Common").Include(
                      "~/Content/vendor/plugins/form/bootstrap-select/bootstrap-select.min.css"));

            bundles.Add(new StyleBundle("~/amCharts/css").Include(
                    "~/Content/assets/css/amchartserial/style.css",
                    "~/Scripts/amchart/plugins/export/export.css"));
        }
    }
}
