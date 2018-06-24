namespace ReactWebApiDemo

open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Primitives


type Startup private () =
    new (configuration: IConfiguration) as this =
        Startup() then
        this.Configuration <- configuration

    // This method gets called by the runtime. Use this method to add services to the container.
    member this.ConfigureServices(services: IServiceCollection) =
        // Add framework services.
        services.AddMvc() |> ignore

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    member this.Configure(app: IApplicationBuilder, env: IHostingEnvironment) =
        let options = StaticFileOptions()
        options.OnPrepareResponse <- fun ( context ) ->
            context.Context.Response.Headers.Add(
                        "Content-Security-Policy",
                        StringValues(
                            "script-src 'self' 'unsafe-inline';; " +
                            //"script-src 'self'; " +
                            "style-src 'self' 'unsafe-inline'; " + // allow Node-style "include style from 'blah.css'"
                            //"style-src 'self'; " +
                            "img-src 'self'" 
                        ) );
        app
            .UseDefaultFiles()
            .UseStaticFiles( options )
            .UseMvc() 
            |> ignore
        (* Alternative:
        app
            .UseDefaultFiles()
            .UseStaticFiles()
            .UseMvc() 
            .Use( fun ( context : HttpContext ) ( next : Func<Task> ) ->
                async {
                    context.Response.Headers.Add(
                        "Content-Security-Policy",
                        StringValues(
                            "script-src 'self'; " +
                            "style-src 'self' 'unsafe-inline'; " +
                            //"style-src 'self'; " +
                            "img-src 'self'" 
                        ) );
                    return! next.Invoke() |> Async.AwaitTask
                } |> Async.StartAsTask :> Task
            )
            |> ignore
        *)
    member val Configuration : IConfiguration = null with get, set