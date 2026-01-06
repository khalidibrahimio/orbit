#!/bin/bash
set -e

# Initialize database if not already initialized
if [ ! -f /var/lib/postgresql/data/PG_VERSION ]; then
    echo "Cleaning data directory..."
    rm -rf /var/lib/postgresql/data/*
    echo "Initializing PostgreSQL database..."
    su-exec postgres initdb -D /var/lib/postgresql/data
    
    # Start PostgreSQL temporarily to create user and database
    echo "Starting PostgreSQL temporarily for setup..."
    su-exec postgres postgres -D /var/lib/postgresql/data -c config_file=/var/lib/postgresql/data/postgresql.conf &
    PID=$!
    sleep 5  # Wait for PostgreSQL to start
    
    # Create database if specified
    if [ "$POSTGRES_DB" ] && [ "$POSTGRES_DB" != 'postgres' ]; then
        echo "Creating database $POSTGRES_DB..."
        su-exec postgres createdb "$POSTGRES_DB"
    fi
    
    # Create user if specified
    if [ "$POSTGRES_USER" ]; then
        echo "Creating user $POSTGRES_USER..."
        echo -e "$POSTGRES_PASSWORD\n$POSTGRES_PASSWORD" | su-exec postgres createuser --superuser --createdb --createrole --inherit --login --pwprompt "$POSTGRES_USER"
    fi
    
    # Stop temporary PostgreSQL
    echo "Stopping temporary PostgreSQL..."
    kill $PID
    wait $PID
fi

# Copy custom configuration files
echo "Copying custom configuration files..."
cp /tmp/pg_hba.conf /var/lib/postgresql/data/pg_hba.conf
cp /tmp/postgresql.conf /var/lib/postgresql/data/postgresql.conf

# Ensure correct ownership
chown -R postgres:postgres /var/lib/postgresql/data

# Start PostgreSQL
echo "Starting PostgreSQL..."
exec su-exec postgres postgres -c config_file=/var/lib/postgresql/data/postgresql.conf