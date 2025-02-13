create table user_account (
    -- base schema
    id uuid default gen_random_uuid() primary key,
    created_at timestamptz default now(),
    created_by uuid references user_account,
    updated_at timestamptz default now(),
    updated_by uuid references user_account,
    deleted_at timestamptz,
    data_version int default 1,
    -- user schema
    name varchar not null,
    display_name varchar not null,
    email varchar not null,
    is_admin boolean not null default false
);