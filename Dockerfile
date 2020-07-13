FROM nginx:1.18.0

COPY default.conf /etc/nginx/conf.d/default.conf
COPY images /usr/share/nginx/html/images
COPY node_modules /usr/share/nginx/html/node_modules
COPY js /usr/share/nginx/html/js
COPY build /usr/share/nginx/html/build
COPY .jshintrc index.html LICENSE package-lock.json package.json README.md /usr/share/nginx/html/

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80