"""empty message

Revision ID: 707c02d0170e
Revises: 751a59029201
Create Date: 2020-10-15 17:46:31.015343

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '707c02d0170e'
down_revision = '751a59029201'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('required_security_point_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['required_security_point_id'], ['security_points.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('providers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('specialty', sa.String(length=40), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('care_teams',
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('provider_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['providers.id'], ),
    sa.PrimaryKeyConstraint('patient_id', 'provider_id')
    )
    op.add_column('encounters', sa.Column('patient_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'encounters', 'patients', ['patient_id'], ['id'])
    op.add_column('orders', sa.Column('provider_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'orders', 'providers', ['provider_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'orders', type_='foreignkey')
    op.drop_column('orders', 'provider_id')
    op.drop_constraint(None, 'encounters', type_='foreignkey')
    op.drop_column('encounters', 'patient_id')
    op.drop_table('care_teams')
    op.drop_table('providers')
    op.drop_table('activities')
    # ### end Alembic commands ###
