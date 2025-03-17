FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /root
COPY ./DockerLab2 /root
RUN dotnet build
ENTRYPOINT [ "dotnet", "run" ]
