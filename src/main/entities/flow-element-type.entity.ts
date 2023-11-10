import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'flow_element_types' })
export class FlowElementTypeEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'type_id' })
  id: string

  @Column({ length: 50, type: 'varchar' })
  name: string

  @Column({ length: 50, name: 'personal_name', type: 'varchar' })
  personalName: string
}
