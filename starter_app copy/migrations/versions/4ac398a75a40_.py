"""empty message

Revision ID: 4ac398a75a40
Revises: 
Create Date: 2020-10-19 21:33:29.150047

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4ac398a75a40'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('encounter_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('roles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('security_points',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=100), nullable=False),
    sa.Column('profile_picture_path', sa.String(length=500), nullable=True),
    sa.Column('first_name', sa.String(length=100), nullable=True),
    sa.Column('last_name', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('required_security_point_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['required_security_point_id'], ['security_points.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('firstName', sa.String(length=40), nullable=True),
    sa.Column('lastName', sa.String(length=40), nullable=True),
    sa.Column('dob', sa.DateTime(), nullable=True),
    sa.Column('ethnicity', sa.String(length=40), nullable=True),
    sa.Column('sex', sa.String(length=40), nullable=True),
    sa.Column('work', sa.String(length=40), nullable=True),
    sa.Column('address_line_one', sa.String(length=80), nullable=True),
    sa.Column('address_line_two', sa.String(length=80), nullable=True),
    sa.Column('address_line_three', sa.String(length=80), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('providers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('specialty', sa.String(length=40), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('role_security',
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.Column('security_point_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['roles.id'], ),
    sa.ForeignKeyConstraint(['security_point_id'], ['security_points.id'], ),
    sa.PrimaryKeyConstraint('role_id', 'security_point_id')
    )
    op.create_table('user_roles',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['roles.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'role_id')
    )
    op.create_table('user_security',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('security_point_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['security_point_id'], ['security_points.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'security_point_id')
    )
    op.create_table('allergies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('noted', sa.DateTime(), nullable=True),
    sa.Column('name', sa.String(length=2000), nullable=True),
    sa.Column('details', sa.String(length=2000), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('care_teams',
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('provider_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['providers.id'], ),
    sa.PrimaryKeyConstraint('patient_id', 'provider_id')
    )
    op.create_table('encounters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('encounter_type_id', sa.Integer(), nullable=True),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['encounter_type_id'], ['encounter_types.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['providers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('medications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('last_fill', sa.DateTime(), nullable=True),
    sa.Column('name', sa.String(length=2000), nullable=True),
    sa.Column('instructions', sa.String(length=2000), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['providers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=2000), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['providers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('problems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=40), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['providers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.String(length=40), nullable=True),
    sa.Column('encounter_id', sa.Integer(), nullable=True),
    sa.Column('provider_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['encounter_id'], ['encounters.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['providers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('orders')
    op.drop_table('problems')
    op.drop_table('notes')
    op.drop_table('medications')
    op.drop_table('encounters')
    op.drop_table('care_teams')
    op.drop_table('allergies')
    op.drop_table('user_security')
    op.drop_table('user_roles')
    op.drop_table('role_security')
    op.drop_table('providers')
    op.drop_table('patients')
    op.drop_table('activities')
    op.drop_table('users')
    op.drop_table('security_points')
    op.drop_table('roles')
    op.drop_table('encounter_types')
    # ### end Alembic commands ###
