using FarmerAPI.Domain.Contracts;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace FarmerAPI.Extensions
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            _logger.LogError(exception, exception.Message);
            var response = new ErrorResponse
            {
                Title = exception.Message,
            };

            switch (exception)
            {
                case BadHttpRequestException:
                    response.statusCode = (int)HttpStatusCode.BadRequest;
                    response.Title = exception.Message;
                    response.Details = exception.Message;
                    break;

                default:
                    response.statusCode = (int)HttpStatusCode.InternalServerError;
                    response.Title = exception.Message;
                    response.Details = exception.Message;
                    break;
            }

            httpContext.Response.StatusCode = response.statusCode;
            await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

            return true;
        }
    }
}