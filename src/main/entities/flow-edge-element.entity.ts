import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FlowChartElementEntity } from './flow-chart-element.entity'

@Entity({ name: 'flow_edges' })
export class FlowEdgeEntity {
  @PrimaryGeneratedColumn('increment', { name: 'edge_id' })
  id: string

  @ManyToOne(() => FlowChartElementEntity, { eager: true })
  @JoinColumn({ name: 'start_node_id' })
  startNode: FlowChartElementEntity

  @ManyToOne(() => FlowChartElementEntity, { eager: true })
  @JoinColumn({ name: 'end_node_id' })
  endNode: FlowChartElementEntity

  @Column({ length: 50, type: 'varchar' })
  name: string
}
