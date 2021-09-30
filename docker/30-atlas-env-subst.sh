#!/bin/sh

set -e

if [ -n "${FEDER8_WEBAPI_URL}" ]; then
  # make sure the WebAPI URL ends with a slash
  case $FEDER8_WEBAPI_URL in
    # correct, no action
    */)
      ;;
    # otherwise, add slash
    *)
      FEDER8_WEBAPI_URL="$FEDER8_WEBAPI_URL/"
      ;;
  esac
  CONFIG_LOCAL="/usr/share/nginx/html/js/config-local.js"
  TFILE=`mktemp`
  trap "rm -f $TFILE" 0 1 2 3 15
  envsubst '$FEDER8_WEBAPI_URL' < "$CONFIG_LOCAL" > "$TFILE"
  cat "$TFILE" > "$CONFIG_LOCAL"
  rm -f "$TFILE"
fi

if [ -n "${FEDER8_ATLAS_SECURE}" ]; then
  CONFIG_LOCAL="/usr/share/nginx/html/js/config-local.js"
  TFILE=`mktemp`
  trap "rm -f $TFILE" 0 1 2 3 15
  envsubst '$FEDER8_ATLAS_SECURE' < "$CONFIG_LOCAL" > "$TFILE"
  cat "$TFILE" > "$CONFIG_LOCAL"
  rm -f "$TFILE"
fi

if [ -n "${FEDER8_ATLAS_CENTRAL}" ]; then
  CONFIG_LOCAL="/usr/share/nginx/html/js/config-local.js"
  TFILE=`mktemp`
  trap "rm -f $TFILE" 0 1 2 3 15
  envsubst '$FEDER8_ATLAS_CENTRAL' < "$CONFIG_LOCAL" > "$TFILE"
  cat "$TFILE" > "$CONFIG_LOCAL"
  rm -f "$TFILE"
fi

if [ -n "${FEDER8_ATLAS_LDAP_ENABLED}" ]; then
  CONFIG_LOCAL="/usr/share/nginx/html/js/config-local.js"
  TFILE=`mktemp`
  trap "rm -f $TFILE" 0 1 2 3 15
  envsubst '$FEDER8_ATLAS_LDAP_ENABLED' < "$CONFIG_LOCAL" > "$TFILE"
  cat "$TFILE" > "$CONFIG_LOCAL"
  rm -f "$TFILE"
fi