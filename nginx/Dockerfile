FROM nginx:1.27-alpine

# Remove a configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia o teu arquivo customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf
